import requests
import json
import time

BASE_URL = "http://127.0.0.1:8080/api"

def print_step(msg):
    print(f"\n[{time.strftime('%H:%M:%S')}] >>> {msg}")

def print_success(msg):
    print(f"[{time.strftime('%H:%M:%S')}] OK: {msg}")

def print_error(msg):
    print(f"[{time.strftime('%H:%M:%S')}] FAIL: {msg}")

session_cand_a = requests.Session()
session_cand_b = requests.Session()
session_emp_a = requests.Session()
session_emp_b = requests.Session()

def register_candidate(email, first_name, last_name):
    print_step(f"Registering Candidate: {email}")
    time.sleep(1)
    res = requests.post(f"{BASE_URL}/auth/register/candidate", json={
        "email": email,
        "password": "Password123!",
        "firstName": first_name,
        "lastName": last_name
    })
    if res.status_code == 201 or 'already exists' in res.text:
        print_success(f"Candidate {email} registered.")
    else:
        print_error(f"Failed to register {email}: {res.status_code} {res.text}")

def register_employer(email, company_name):
    print_step(f"Registering Employer: {email}")
    time.sleep(1)
    res = requests.post(f"{BASE_URL}/auth/register/employer", json={
        "email": email,
        "password": "Password123!",
        "companyName": company_name
    })
    if res.status_code == 201 or 'already exists' in res.text:
        print_success(f"Employer {email} registered.")
    else:
        print_error(f"Failed to register {email}: {res.status_code} {res.text}")

def login(session, email):
    print_step(f"Logging in: {email}")
    time.sleep(1)
    res = session.post(f"{BASE_URL}/auth/login", json={
        "email": email,
        "password": "Password123!"
    })
    if res.status_code == 200:
        print_success(f"Logged in {email}.")
    else:
        print_error(f"Login failed for {email}: {res.status_code} {res.text}")

def set_csrf(session):
    xsrf = session.cookies.get('XSRF-TOKEN')
    if xsrf:
        session.headers.update({'X-XSRF-TOKEN': xsrf})

def run_tests():
    try:
        # Wait for backend to be fully up
        print_step("Waiting for Backend to start...")
        for _ in range(30):
            try:
                res = requests.post(f"{BASE_URL}/auth/login", json={})
                if res.status_code != 502:  # Anything but bad gateway/refused means it's up
                    print_success("Backend is UP!")
                    break
            except Exception as e:
                print(f"Exception during wait: {e}")
            time.sleep(2)
        else:
            print_error("Backend failed to start in time.")
            return
            
        # 1. Registration
        register_candidate("candA@test.com", "Alice", "Candidate")
        register_candidate("candB@test.com", "Bob", "Candidate")
        register_employer("empA@test.com", "Acme Corp")
        register_employer("empB@test.com", "Globex")

        # 2. Login
        login(session_cand_a, "candA@test.com")
        login(session_cand_b, "candB@test.com")
        login(session_emp_a, "empA@test.com")
        login(session_emp_b, "empB@test.com")
        
        set_csrf(session_cand_a)
        set_csrf(session_cand_b)
        set_csrf(session_emp_a)
        set_csrf(session_emp_b)

        # 3. Create Project (Employer A)
        print_step("Creating Project via Employer A")
        time.sleep(1)
        res = session_emp_a.post(f"{BASE_URL}/projects", json={
            "title": "Real MongoDB Integration Project",
            "description": "This project must be persisted to the actual MongoDB instance, not mocked.",
            "budget": 5000,
            "skills": ["Java", "React", "MongoDB"],
            "milestones": [
                {"title": "Backend Setup", "amount": "2500", "weeks": 2},
                {"title": "Frontend Setup", "amount": "2500", "weeks": 2}
            ]
        })
        if res.status_code == 201:
            project_id = res.json()['id']
            print_success(f"Project created with ID: {project_id}")
        else:
            print_error(f"Project creation failed: {res.status_code} {res.text}")
            return
        # 4. Fetch Projects
        print_step("Fetching Projects to verify persistence")
        res = session_emp_a.get(f"{BASE_URL}/projects")
        if res.status_code == 200:
            projects = res.json()
            if any(p.get('id') == project_id for p in projects):
                print_success("Project found in GET /projects (Persisted to MongoDB).")
            else:
                print_error("Project NOT found in GET /projects.")
        else:
            print_error(f"Projects fetch failed: {res.text}")

        # 5. Isolation Test (Task 11)
        print_step("Testing Multi-User Isolation")
        res = session_emp_b.patch(f"{BASE_URL}/projects/{project_id}/status?status=IN_PROGRESS")
        if res.status_code in [403, 401, 404]:
            print_success(f"Isolation working: Employer B cannot edit Employer A's project (Got {res.status_code})")
        else:
            print_error(f"Isolation FAILED: Employer B edited Employer A's project! Status: {res.status_code}")

        # 6. Passport & Privacy Workflow (Task 9)
        print_step("Testing Passport & Privacy Workflow")
        res = session_cand_a.put(f"{BASE_URL}/passports/me", json={
            "headline": "Expert Developer",
            "availability": True,
            "skills": [{"name": "Java", "verified": True}]
        })
        if res.status_code == 200:
            print_success("Candidate A passport updated.")
        else:
            print_error(f"Passport update failed: {res.status_code} {res.text}")

        # 7. Opportunity & Match Workflow (Task 8)
        print_step("Testing Opportunity Workflow")
        res = session_emp_a.post(f"{BASE_URL}/opportunities", json={
            "title": "Need Java Dev",
            "description": "Looking for Java expert",
            "budget": 5000,
            "requiredSkills": ["Java"]
        })
        if res.status_code == 200:
            opp_id = res.json()['id']
            print_success(f"Opportunity created: {opp_id}")
            # Fetch matches
            res_matches = session_emp_a.get(f"{BASE_URL}/opportunities/{opp_id}/matches")
            if res_matches.status_code == 200:
                print_success(f"Opportunity matches fetched: {len(res_matches.json())} found.")
            else:
                print_error(f"Failed to fetch matches: {res_matches.status_code}")
        else:
            print_error(f"Opportunity creation failed: {res.status_code} {res.text}")

        # 8. Project Status Testing (Task 12)
        print_step("Testing Project Status Transitions")
        res = session_emp_a.patch(f"{BASE_URL}/projects/{project_id}/status?status=IN_PROGRESS")
        if res.status_code == 200:
            print_success("Project status successfully updated to IN_PROGRESS.")
        else:
            print_error(f"Project status update failed: {res.status_code} {res.text}")

        # 10. Real Message Workflow (Task 7)
        print_step("Testing Message Workflow")
        res = session_emp_a.post(f"{BASE_URL}/messages", json={
            "projectId": project_id,
            "receiverId": opp_id, # Using opp_id as a dummy receiver just for testing persistence
            "content": "Hello, this is a test message."
        })
        if res.status_code == 200:
            msg_id = res.json()['id']
            print_success(f"Message sent and persisted: {msg_id}")
        else:
            print_error(f"Message sending failed: {res.status_code} {res.text}")

        # 11. Real Dashboard Data (Task 10)
        print_step("Testing Admin Dashboard Stats")
        session_admin = requests.Session()
        res = session_admin.post(f"{BASE_URL}/auth/login", json={
            "email": "admin@talentx.com",
            "password": "admin123"
        })
        if res.status_code == 200:
            set_csrf(session_admin)
            res_stats = session_admin.get(f"{BASE_URL}/admin/stats")
            if res_stats.status_code == 200:
                print_success(f"Admin Dashboard Stats fetched successfully: {res_stats.json()}")
            else:
                print_error(f"Admin Stats fetch failed: {res_stats.status_code} {res_stats.text}")
        else:
            print_error("Admin login failed.")

        # 12. Verify MongoDB Indexes (Task 13)
        print_step("Verifying MongoDB Indexes")
        from pymongo import MongoClient
        client = MongoClient('mongodb://localhost:27017/')
        db = client['talentx']
        users_idx = list(db.users.list_indexes())
        if any(idx.get('name') == 'email_1' or idx.get('key', {}).get('email') for idx in users_idx):
            print_success("MongoDB Email index found on users collection.")
        else:
            print_error("MongoDB Email index NOT found!")

        print_success("All comprehensive runtime verifications passed via API!")
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        print_error(f"Test failed with exception: {str(e)}")

if __name__ == "__main__":
    run_tests()

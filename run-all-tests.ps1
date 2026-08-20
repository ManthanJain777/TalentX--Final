$ErrorActionPreference = 'SilentlyContinue'

Write-Host "=== TALENTX API Tests ==="
Write-Host "Running test suite..."

$PASSED = 0
$FAILED = 0
$BASE_URL = "http://localhost:8080"

# Test 1: Health Check
Write-Host -NoNewline "Test 1: Health Check... "
try {
    $response = Invoke-WebRequest -Uri "$BASE_URL/actuator/health" -Method Get -TimeoutSec 5
    if ($response.Content -match "UP") {
        Write-Host "✅ PASSED" -ForegroundColor Green
        $PASSED++
    } else {
        Write-Host "❌ FAILED" -ForegroundColor Red
        $FAILED++
    }
} catch {
    Write-Host "❌ FAILED" -ForegroundColor Red
    $FAILED++
}

# Test 2: Register Candidate
Write-Host -NoNewline "Test 2: Register Candidate... "
try {
    $body = @{
        email = "test.temp@talentx.com"
        password = "Test@123456"
        name = "Temp Candidate"
        role = "CANDIDATE"
    } | ConvertTo-Json

    $response = Invoke-WebRequest -Uri "$BASE_URL/api/auth/register/candidate" -Method Post -Body $body -ContentType "application/json"
    if ($response.StatusCode -eq 201) {
        Write-Host "✅ PASSED" -ForegroundColor Green
        $PASSED++
    } else {
        Write-Host "❌ FAILED" -ForegroundColor Red
        $FAILED++
    }
} catch {
    # If the user already exists, it might throw a 409, which means the endpoint is working
    if ($_.Exception.Response.StatusCode.value__ -eq 409) {
        Write-Host "✅ PASSED (Already Exists)" -ForegroundColor Green
        $PASSED++
    } else {
        Write-Host "❌ FAILED" -ForegroundColor Red
        $FAILED++
    }
}

# Test 3: Attempt Admin Access without Token
Write-Host -NoNewline "Test 3: Attempt Admin Access w/o Token (Should Fail)... "
try {
    $response = Invoke-WebRequest -Uri "$BASE_URL/api/admin/users" -Method Get
    Write-Host "❌ FAILED" -ForegroundColor Red
    $FAILED++
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 401 -or $_.Exception.Response.StatusCode.value__ -eq 403) {
        Write-Host "✅ PASSED" -ForegroundColor Green
        $PASSED++
    } else {
        Write-Host "❌ FAILED" -ForegroundColor Red
        $FAILED++
    }
}

Write-Host "---------------------------"
Write-Host "=== Test Summary ==="
Write-Host "Passed: $PASSED"
Write-Host "Failed: $FAILED"
if (($PASSED + $FAILED) -gt 0) {
    $PassRate = [math]::Round(($PASSED * 100 / ($PASSED + $FAILED)), 2)
    Write-Host "Pass Rate: $PassRate%"
}
Write-Host "---------------------------"

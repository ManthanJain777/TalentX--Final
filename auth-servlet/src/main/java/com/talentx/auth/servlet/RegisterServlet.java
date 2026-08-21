package com.talentx.auth.servlet;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.talentx.auth.util.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.Document;
import org.mindrot.jbcrypt.BCrypt;

import java.io.IOException;
import java.util.Date;

public class RegisterServlet extends HttpServlet {

    private MongoClient mongoClient;
    private MongoDatabase database;

    @Override
    public void init() throws ServletException {
        String uri = System.getenv("MONGODB_URI");
        if (uri == null || uri.isEmpty()) {
            uri = "mongodb+srv://<username>:<password>@cluster0.anwteik.mongodb.net";
        }
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("talentx");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/views/register.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String fullName = request.getParameter("fullName");
        String email = request.getParameter("email");
        String password = request.getParameter("password");
        String role = request.getParameter("role"); // CANDIDATE or EMPLOYER

        MongoCollection<Document> users = database.getCollection("users");

        // Check if email already exists
        Document existing = users.find(new Document("email", email)).first();
        if (existing != null) {
            request.setAttribute("error", "An account with this email already exists");
            request.getRequestDispatcher("/views/register.jsp").forward(request, response);
            return;
        }

        // Hash password with BCrypt
        String passwordHash = BCrypt.hashpw(password, BCrypt.gensalt(10));

        // Create user document
        Document newUser = new Document()
                .append("email", email)
                .append("passwordHash", passwordHash)
                .append("fullName", fullName)
                .append("role", role.toUpperCase())
                .append("status", "ACTIVE")
                .append("verified", false)
                .append("discoverable", false)
                .append("createdAt", new Date());

        users.insertOne(newUser);

        String userId = newUser.getObjectId("_id").toString();
        String token = JwtUtil.generateToken(email, role.toUpperCase(), userId);

        // Redirect to React frontend with JWT token
        String redirectUrl = "http://localhost:3000/auth/callback?token=" + token + "&role=" + role.toUpperCase();
        response.sendRedirect(redirectUrl);
    }

    @Override
    public void destroy() {
        if (mongoClient != null) mongoClient.close();
    }
}

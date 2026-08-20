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

public class LoginServlet extends HttpServlet {

    private MongoClient mongoClient;
    private MongoDatabase database;

    @Override
    public void init() throws ServletException {
        mongoClient = MongoClients.create("mongodb+srv://24etccs100manthan_db_user:eluWA1FK3VdDJI9i@cluster0.anwteik.mongodb.net");
        database = mongoClient.getDatabase("talentx");
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        request.getRequestDispatcher("/views/login.jsp").forward(request, response);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        MongoCollection<Document> users = database.getCollection("users");
        Document user = users.find(new Document("email", email)).first();

        if (user == null) {
            request.setAttribute("error", "Invalid email or password");
            request.getRequestDispatcher("/views/login.jsp").forward(request, response);
            return;
        }

        String storedHash = user.getString("passwordHash");
        if (!BCrypt.checkpw(password, storedHash)) {
            request.setAttribute("error", "Invalid email or password");
            request.getRequestDispatcher("/views/login.jsp").forward(request, response);
            return;
        }

        String role = user.getString("role");
        String userId = user.getObjectId("_id").toString();

        String token = JwtUtil.generateToken(email, role, userId);

        // Redirect to React frontend with JWT token
        String redirectUrl = "http://localhost:3000/auth/callback?token=" + token + "&role=" + role;
        response.sendRedirect(redirectUrl);
    }

    @Override
    public void destroy() {
        if (mongoClient != null) mongoClient.close();
    }
}

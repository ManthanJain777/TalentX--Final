package com.talentx.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;

@Configuration
@EnableMongoAuditing
public class MongoConfig {
    // Spring Boot auto-configures MongoClient from application.properties.
    // @EnableMongoAuditing enables @CreatedDate and @LastModifiedDate annotations.
}

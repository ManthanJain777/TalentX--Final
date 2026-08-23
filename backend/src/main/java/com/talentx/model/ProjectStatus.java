package com.talentx.model;

import java.util.EnumSet;
import java.util.Locale;
import java.util.Set;

/**
 * Allowed project lifecycle states and transitions.
 * The server, not the client, is the source of truth for valid transitions.
 */
public enum ProjectStatus {
    DRAFT,
    ACTIVE,
    PAUSED,
    DISPUTED,
    COMPLETED;

    public static ProjectStatus parse(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Project status is required");
        }
        try {
            return ProjectStatus.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Unsupported project status: " + value);
        }
    }

    public boolean canTransitionTo(ProjectStatus target) {
        if (target == null || target == this) {
            return false;
        }

        return switch (this) {
            case DRAFT -> target == ACTIVE;
            case ACTIVE -> EnumSet.of(PAUSED, DISPUTED, COMPLETED).contains(target);
            case PAUSED -> EnumSet.of(ACTIVE, DISPUTED, COMPLETED).contains(target);
            case DISPUTED -> EnumSet.of(ACTIVE, COMPLETED).contains(target);
            case COMPLETED -> false;
        };
    }

    public static Set<ProjectStatus> allowedNextStates(ProjectStatus current) {
        return switch (current) {
            case DRAFT -> Set.of(ACTIVE);
            case ACTIVE -> Set.of(PAUSED, DISPUTED, COMPLETED);
            case PAUSED -> Set.of(ACTIVE, DISPUTED, COMPLETED);
            case DISPUTED -> Set.of(ACTIVE, COMPLETED);
            case COMPLETED -> Set.of();
        };
    }
}

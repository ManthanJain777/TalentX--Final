package com.talentx.dao;

import java.util.List;
import java.util.Optional;

public interface BaseDao<T> {
    T save(T entity);
    Optional<T> findById(String id);
    List<T> findAll();
    void deleteById(String id);
    boolean existsById(String id);
}

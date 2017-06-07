package com.dgteam.dgbackend.repository;


import com.dgteam.dgbackend.domain.SchemaOrgHeader;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

/**
 * Created by Piotrek on 04.05.2017.
 */
public interface SchemaOrgHeaderRepository extends MongoRepository<SchemaOrgHeader, String> {

    List<SchemaOrgHeader> findByName(String name);

    List<SchemaOrgHeader> findAllBy(TextCriteria crit);

    List<SchemaOrgHeader> findByAuthor(String author);

    SchemaOrgHeader findById(String id);
}

package com.dgteam.dgbackend.domain;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.TextIndexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

/**
 * Class representing a record header, compatible with schema.org
 * Headers are stored in a "record-headers" collection.
 * Created by Piotrek on 04.05.2017.
 */
@Document
public class SchemaOrgHeader {

    @Id
    private String id;
    private final String context = "http://schema.org";
    private final String type = "CreativeWork";
    @TextIndexed
    private String name;
    @TextIndexed
    private String about;
    @TextIndexed
    private String author;
    private String reviewedBy;
    private ReviewStatus reviewStatus;
    private SchemaOrgPerson creator = null;
    private LocalDateTime dateCreated;
    private List<CitationMetadata> citations;

    public SchemaOrgHeader() {
        this.citations = new LinkedList<>();
        this.dateCreated = LocalDateTime.now();
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAbout(String about) {
        this.about = about;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setCreator(SchemaOrgPerson creator) {
        this.creator = creator;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public void addCitation(CitationMetadata citation) {
        this.citations.add(citation);
    }

    public String getId() {
        return id;
    }

    public String getContext() {
        return context;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public String getAbout() {
        return about;
    }

    public String getAuthor() {
        return author;
    }

    public SchemaOrgPerson getCreator() {
        return creator;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public List<CitationMetadata> getCitations() {
        return citations;
    }

    @Override
    public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        String result = null;
        try {
            result = mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return result;
    }

    public String getReviewedBy() {
        return reviewedBy;
    }

    public void setReviewedBy(String reviewedBy) {
        this.reviewedBy = reviewedBy;
    }

    public ReviewStatus getReviewStatus() {
        return reviewStatus;
    }

    public void setReviewStatus(ReviewStatus reviewStatus) {
        this.reviewStatus = reviewStatus;
    }
}

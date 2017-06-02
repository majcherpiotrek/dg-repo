package com.dgteam.dgbackend.dto;

import com.dgteam.dgbackend.domain.CitationMetadata;
import com.dgteam.dgbackend.domain.SchemaOrgHeader;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Created by Adas on 2017-05-04.
 */
public class SnippetDTO {
    private String id;
    private String recordName;
    private String author;
    private String description;
    private LocalDateTime created;
    private List<CitationMetadata> citations;

    public SnippetDTO(SchemaOrgHeader schemaOrgHeader) {
        this.id = schemaOrgHeader.getId();
        this.recordName = schemaOrgHeader.getName();
        this.author = schemaOrgHeader.getAbout();
        this.description = schemaOrgHeader.getAbout();
        this.citations = schemaOrgHeader.getCitations();
        this.created = schemaOrgHeader.getDateCreated();
    }


    public String getId() {
        return id;
    }

    public String getRecordName() {
        return recordName;
    }

    public String getAuthor() {
        return author;
    }

    public String getDescription() {
        return description;
    }

    public List<CitationMetadata> getCitations() {
        return citations;
    }

    public LocalDateTime getCreated() {
        return created;
    }
}

package com.dgteam.dgbackend.dto;


import com.dgteam.dgbackend.domain.CitationMetadata;
import com.dgteam.dgbackend.domain.SchemaOrgHeader;
import com.dgteam.dgbackend.domain.SchemaOrgPerson;
import com.mongodb.gridfs.GridFSDBFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Adas on 2017-05-16.
 */
public class RecordDTO {
    private String id;
    private String name;
    private String about;
    private String author;
    private SchemaOrgPerson creator = null;
    private List<String> filesNames;

    public  RecordDTO() {
    }
    public RecordDTO(SchemaOrgHeader header, List<GridFSDBFile> files) {
        this.id = header.getId();
        this.name = header.getName();
        this.about = header.getAbout();
        this.author = header.getAuthor();
        this.creator = header.getCreator();
        this.filesNames = new ArrayList<>();
        for (GridFSDBFile file : files) {
            this.filesNames.add((String)file.getMetaData().get("fileName"));
        }
    }

    public String getId() {
        return id;
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

    public void setId(String id) {
        this.id = id;
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

    public void setFilesNames(List<String> filesNames) {
        this.filesNames = filesNames;
    }

    public SchemaOrgPerson getCreator() {
        return creator;
    }

    public List<String> getFilesNames() {
        return filesNames;
    }
}

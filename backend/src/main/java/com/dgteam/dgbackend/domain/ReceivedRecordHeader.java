package com.dgteam.dgbackend.domain;

/**
 * Created by Piotrek on 10.05.2017.
 */
public class ReceivedRecordHeader {

    private static final String context = "http://schema.org";
    private static final String type = "CreativeWork";
    private String name;
    private String about;
    private String author;
    private String description;
    private SchemaOrgPerson creator;

    public ReceivedRecordHeader(String name, String about, String author, String description, SchemaOrgPerson creator) {
        this.name = name;
        this.about = about;
        this.author = author;
        this.description = description;
        this.creator = creator;
    }

    @Override
    public String toString() {
        return "{" +
            "\"@context\":\"" + context + "\"" +
            "\"@type\":\"" + type + "\"" +
            "\"name\":\"" + name + "\"" +
            ",\"about\":\"" + about + "\"" +
            ",\"author\":\"" + author + "\"" +
            ",\"description\":\"" + description + "\"" +
            ",\"creator\":" + creator.toString() +
            '}';
    }

    public String getAuthor() {
        return author;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAbout() {
        return about;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public SchemaOrgPerson getCreator() {
        return creator;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        ReceivedRecordHeader that = (ReceivedRecordHeader) o;

        if (name != null ? !name.equals(that.name) : that.name != null) return false;
        if (about != null ? !about.equals(that.about) : that.about != null) return false;
        if (author != null ? !author.equals(that.author) : that.author != null) return false;
        if (description != null ? !description.equals(that.description) : that.description != null) return false;
        return creator != null ? creator.equals(that.creator) : that.creator == null;
    }
}

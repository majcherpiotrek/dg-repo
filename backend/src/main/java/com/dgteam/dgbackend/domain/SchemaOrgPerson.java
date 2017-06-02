package com.dgteam.dgbackend.domain;

import com.dgteam.dgbackend.domain.schemaorg.enums.PersonTags;
import com.mongodb.BasicDBObject;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by Piotrek on 10.05.2017.
 */
public class SchemaOrgPerson extends BasicDBObject {

    private final List<String> tagsList;
    private final List<String> addedTagsList;

    public SchemaOrgPerson() {
        super();
        this.tagsList = new LinkedList<>();
        this.addedTagsList = new LinkedList<>();
        this.addedTagsList.add("@context");
        this.addedTagsList.add("@type");
        this.put("@context", "http://schema.org");
        this.put("@type", "Person");
        for (PersonTags tag : PersonTags.values()) {
            tagsList.add(tag.toString());
        }

    }

    public List<String> getTagsList() {
        return tagsList;
    }

    private boolean isValidTag(String tag) {
        for (String t : this.tagsList) {
            if (t.equals(tag)) {
                return true;
            }
        }
        return false;
    }

    public void addData(String key, Object value) throws Exception {
        if (!isValidTag(key))
            throw new Exception(CitationMetadata.class.getName() + ": invalid tag in addData() method!");
        this.put(key,value);
        this.addedTagsList.add(key);
    }
}

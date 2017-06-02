package com.dgteam.dgbackend.domain;

import com.dgteam.dgbackend.domain.schemaorg.enums.CitationType;
import com.dgteam.dgbackend.web.util.SchemaOrgTagsSelector;
import com.mongodb.BasicDBObject;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by Piotrek on 14.05.2017.
 */
public class CitationMetadata extends BasicDBObject {

    private List<String> tagsList;
    private List<String> addedTags;

    public CitationMetadata(CitationType type) {
        super();
        this.put("@context", "http://schema.org");
        this.put("@type", type.toString());
        this.addedTags = new LinkedList<>();
        this.addedTags.add("@context");
        this.addedTags.add("@type");

        SchemaOrgTagsSelector selector = new SchemaOrgTagsSelector(CitationType.CreativeWork);
        this.tagsList = selector.getTags();
        if (type != CitationType.CreativeWork) {
            selector = new SchemaOrgTagsSelector(type);
            this.tagsList.addAll(selector.getTags());
        }
        this.tagsList.add("fileName");
        this.tagsList.add("recordName");
        this.tagsList.add("recordId");
    }

    public String getType() {
        return (String) this.get("@type");
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
        if (value != null) {
            this.addedTags.add(key);
        }
    }

    public Object getData(String key) throws Exception {
        if (!isValidTag(key))
            throw new Exception(CitationMetadata.class.getName() + ": invalid tag in getData() method!");
        return this.get(key);
    }

    public List<String> getTagsList() {
        return tagsList;
    }
}

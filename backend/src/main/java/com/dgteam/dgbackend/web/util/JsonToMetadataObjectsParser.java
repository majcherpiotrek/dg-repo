package com.dgteam.dgbackend.web.util;

import com.dgteam.dgbackend.domain.CitationMetadata;
import com.dgteam.dgbackend.domain.ReceivedRecordHeader;
import com.dgteam.dgbackend.domain.SchemaOrgPerson;
import com.dgteam.dgbackend.domain.schemaorg.enums.CitationType;
import com.dgteam.dgbackend.domain.schemaorg.enums.CreativeWorkTags;
import com.dgteam.dgbackend.domain.schemaorg.enums.VideoObjectTags;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

/**
 * Created by Piotrek on 11.05.2017.
 */
public class JsonToMetadataObjectsParser {

    private ReceivedRecordHeader recordHeader;
    private List<CitationMetadata> citationList;
    private ObjectMapper mapper;

    public JsonToMetadataObjectsParser() {
        this.mapper = new ObjectMapper();
        mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS, true);
    }

    public ReceivedRecordHeader getReceivedRecordHeader() {
        return recordHeader;
    }

    public void setRecordHeader(String recordHeader) throws Exception {

        JsonNode node;

        try {
            node = mapper.readTree(recordHeader);
        } catch (IOException e) {
            throw new Exception("JSON Parser: Error reading the record header tree: " + e.toString());
        }

        String name = mapper.convertValue(node.get("name"),String.class);
        String about = mapper.convertValue(node.get("about"),String.class);
        String author = mapper.convertValue(node.get("author"),String.class);
        String description = mapper.convertValue(node.get("description"),String.class);
        JsonNode personNode = node.get("creator");
        SchemaOrgPerson person = new SchemaOrgPerson();
        for (String personTag : person.getTagsList()) {
            person.addData(personTag, mapper.convertValue(personNode.get(personTag), String.class));
        }
        this.recordHeader = new ReceivedRecordHeader(name,about,author,description,person);
    }

    public List<CitationMetadata> getCitationList() {
        return citationList;
    }

    public void setCitationList(String citationListJsonString) throws Exception {
        this.citationList = new LinkedList<>();
        JsonNode rootNode;

        try {
            rootNode = mapper.readTree(citationListJsonString);
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        for (JsonNode node : rootNode) {

            String citationTypeString = mapper.convertValue(node.get("type"),String.class);
            CitationType type = null;
            for (CitationType citationType : CitationType.values()) {
                if (citationType.toString().equals(citationTypeString)) {
                    type = citationType;
                    break;
                }
            }
            if (type == null) {
                throw new Exception("JSON Parser: Unsupported media type \"" + citationTypeString + "\" in the metadata of the citation!");
            }

            CitationMetadata meta = new CitationMetadata(type);

            for (String tag : meta.getTagsList()) {
                if (tag.equals(CreativeWorkTags.creator.toString()) ||
                    tag.equals(VideoObjectTags.actor.toString()) ||
                    tag.equals(VideoObjectTags.director.toString())) {

                    JsonNode personNode = node.get(tag);
                    SchemaOrgPerson person = new SchemaOrgPerson();
                    for (String personTag : person.getTagsList()) {
                        person.addData(personTag, mapper.convertValue(personNode.get(personTag), String.class));
                    }
                    meta.addData(tag, person);
                } else {
                    meta.addData(tag, mapper.convertValue(node.get(tag), String.class));
                }
            }

            this.citationList.add(meta);
        }
    }
}

package com.dgteam.dgbackend.web.util;


import com.dgteam.dgbackend.domain.schemaorg.enums.*;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by Piotrek on 13.05.2017.
 */
public class SchemaOrgTagsSelector {

    private List<String> tags;
    public SchemaOrgTagsSelector(CitationType citationType) {
        tags = new LinkedList<>();
        switch (citationType) {
            case Article: {
                for (ArticleTags tag : ArticleTags.values())
                    tags.add(tag.toString());
                break;
            }
            case AudioObject: {
                for (AudioObjectTags tag : AudioObjectTags.values())
                    tags.add(tag.toString());
                break;
            }
            case Book: {
                for (BookTags tag : BookTags.values())
                    tags.add(tag.toString());
                break;
            }
            case CreativeWork: {
                for (CreativeWorkTags tag : CreativeWorkTags.values())
                    tags.add(tag.toString());
                break;
            }
            case ImageObject: {
                for (ImageObjectTags tag : ImageObjectTags.values())
                    tags.add(tag.toString());
                break;
            }
            case MusicRecording: {
                for (MusicRecordingTags tag : MusicRecordingTags.values())
                    tags.add(tag.toString());
                break;
            }
            case SoftwareSourceCode: {
                for (SoftwareSourceCodeTags tag : SoftwareSourceCodeTags.values())
                    tags.add(tag.toString());
                break;
            }
            case VideoObject: {
                for (VideoObjectTags tag : VideoObjectTags.values())
                    tags.add(tag.toString());
                break;
            }
        }

    }
    public List<String> getTags() {
        return this.tags;
    }
}

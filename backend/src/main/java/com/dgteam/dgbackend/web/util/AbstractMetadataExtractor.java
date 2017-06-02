package com.dgteam.dgbackend.web.util;

import com.mongodb.DBObject;

/**
 * Interface that every metadata extractor in this system should implement.
 * getMetadata() method should return a DBObject including metadata to be
 * added to the files contained in a record.
 * Created by Piotrek on 27.04.2017.
 */
public interface AbstractMetadataExtractor {
    DBObject getMetadata() throws Exception;
}

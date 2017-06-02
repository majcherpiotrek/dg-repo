package com.dgteam.dgbackend.web.util;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;

import java.io.IOException;
import java.io.InputStream;

/**
 * Metadata extractor for image files.
 * Supported formats: JPEG PNG WebP GIF ICO BMP TIFF PSD PCX RAW CRW CR2 NEF ORF RAF RW2 RWL SRW ARW DNG X3F
 * Created by Piotrek on 27.04.2017.
 */
public class ImageMetadataExtractor implements AbstractMetadataExtractor {

    private InputStream inputStream;

    public ImageMetadataExtractor(InputStream inputStream){
        this.inputStream = inputStream;
    }
    @Override
    public DBObject getMetadata() throws ImageProcessingException, IOException {

            DBObject extractedMetadata = new BasicDBObject();
            Metadata innerMetadata = ImageMetadataReader.readMetadata(this.inputStream);

            for (Directory directory : innerMetadata.getDirectories()) {

                //Extract the tags and add to extracted metadata
                for (Tag tag : directory.getTags()) {
                    System.out.format("[%s] - %s = %s",
                        directory.getName(), tag.getTagName(), tag.getDescription());
                    extractedMetadata.put(tag.getTagName(), tag.getDescription());
                }

                if (directory.hasErrors()) {
                    for (String error : directory.getErrors()) {
                        System.err.format("ERROR: %s", error);
                    }
                }
            }

            return extractedMetadata;
    }
}

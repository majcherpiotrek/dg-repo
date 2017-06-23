package com.dgteam.dgbackend.web.rest;

import com.dgteam.dgbackend.domain.CitationMetadata;
import com.dgteam.dgbackend.domain.SchemaOrgHeader;
import com.dgteam.dgbackend.dto.RecordDTO;
import com.dgteam.dgbackend.repository.SchemaOrgHeaderRepository;
import com.dgteam.dgbackend.service.ZipService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.client.gridfs.GridFSBucket;
import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.CriteriaDefinition;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

/**
 * Records Endpoint
 * Created by Adas, Piotrek on 2017-05-16.
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/records")
public class RecordController {

    @Autowired
    private SchemaOrgHeaderRepository schemaOrgHeaderRepository;
    @Autowired
    private GridFsTemplate gridFsTemplate;
    @Autowired
    private ZipService zipService;

    /**
     * Returns a single record specified by record-id
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.GET)
    public RecordDTO getRecord(@RequestParam("record-id") String recordId) {
        SchemaOrgHeader header = schemaOrgHeaderRepository.findById(recordId);
        List<GridFSDBFile> files = gridFsTemplate.find(new Query(Criteria.where("metadata.recordId").is(recordId)));
        return new RecordDTO(header, files);
    }

    /**
     *  Returns all records attachments as ZIP file
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/zip", produces = "application/zip")
    public void getZip(@RequestParam("record-id") String recordId, HttpServletResponse response) throws IOException {
        List<GridFSDBFile> files = gridFsTemplate.find(new Query(Criteria.where("metadata.recordId").is(recordId)));

        SchemaOrgHeader header = schemaOrgHeaderRepository.findById(recordId);
        String recordName = header.getName() + ".zip";
        prepareResponse(response, recordName);

        try {
            zipService.makeAndForwardZip(header, files, response);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(method = RequestMethod.DELETE)
    public String deleteRecord(@RequestParam("record-id") String recordId) {
        schemaOrgHeaderRepository.delete(recordId);
        return "Record " + recordId + " deleted";
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/edit", method = RequestMethod.POST)
    public ResponseEntity<RecordDTO> editRecord(@RequestParam("dto") String recordDTOString){
        RecordDTO recordDTO;
        try {
            recordDTO = new ObjectMapper().readValue(recordDTOString, RecordDTO.class);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new RecordDTO(), HttpStatus.CONFLICT);
        }
        String recordId = recordDTO.getId();
        SchemaOrgHeader header = schemaOrgHeaderRepository.findById(recordId);
        List<GridFSDBFile> files = gridFsTemplate.find(new Query(Criteria.where("metadata.recordId").is(recordId)));
        header.setName(recordDTO.getName());
        header.setAbout(recordDTO.getAbout());
        header.setAuthor(recordDTO.getAuthor());
        header.setCreator(recordDTO.getCreator());
        schemaOrgHeaderRepository.save(header);
        return new ResponseEntity<>(new RecordDTO(header, files), HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/add-file-metadata", method = RequestMethod.POST)
    public ResponseEntity<RecordDTO> addFileMetadata(@RequestParam("dto") String recordDTOString){
        RecordDTO recordDTO;
        try {
            recordDTO = new ObjectMapper().readValue(recordDTOString, RecordDTO.class);
        } catch (IOException e) {
            e.printStackTrace();
            return new ResponseEntity<>(new RecordDTO(), HttpStatus.CONFLICT);
        }
        String recordId = recordDTO.getId();
        String fileName = recordDTO.getName();
        SchemaOrgHeader header = schemaOrgHeaderRepository.findById(recordId);
        Query findFileToAddMetadataQuery = new Query(Criteria.where("metadata.recordId").is(recordId)
                .and("metadata.fileName").is(fileName));
        GridFSDBFile file = gridFsTemplate.findOne(
                findFileToAddMetadataQuery);

        // ???

        return null;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/delete-file", method = RequestMethod.POST)
    public ResponseEntity<RecordDTO> deleteFileFromRecord(@RequestParam("id") String recordId,
                                                          @RequestParam("filename") String fileToDelete){
        SchemaOrgHeader header = schemaOrgHeaderRepository.findById(recordId);
        Query findFilesToDeleteQuery = new Query(Criteria.where("metadata.recordId").is(recordId)
                .and("metadata.fileName").is(fileToDelete));
        List<GridFSDBFile> files = gridFsTemplate.find(
                findFilesToDeleteQuery
        );
        if (header == null || files == null || files.isEmpty()) {
            return new ResponseEntity<>(new RecordDTO(), HttpStatus.CONFLICT);
        }
        gridFsTemplate.delete(
                findFilesToDeleteQuery
        );

        for(Iterator it = header.getCitations().iterator(); it.hasNext();) {
            BasicDBObject meta = (BasicDBObject) it.next();
            if (meta.get("fileName").equals(fileToDelete)) {
                it.remove();
            }
        }

        schemaOrgHeaderRepository.save(header);
        files = gridFsTemplate.find(new Query(Criteria.where("metadata.recordId").is(recordId)));

        return new ResponseEntity<>(new RecordDTO(header, files), HttpStatus.OK);
    }

    
    private void prepareResponse(HttpServletResponse response, String recordName) {
        response.addHeader("Content-Disposition", "attachment; filename=\"" + recordName + "\"");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}


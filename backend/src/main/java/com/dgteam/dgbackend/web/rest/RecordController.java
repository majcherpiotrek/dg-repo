package com.dgteam.dgbackend.web.rest;

import com.dgteam.dgbackend.domain.SchemaOrgHeader;
import com.dgteam.dgbackend.dto.RecordDTO;
import com.dgteam.dgbackend.repository.SchemaOrgHeaderRepository;
import com.mongodb.gridfs.GridFSDBFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Records Endpoint
 * Created by Adas, Piotrek on 2017-05-16.
 */
@RestController
@RequestMapping("/api/records")
public class RecordController {

    @Autowired
    private SchemaOrgHeaderRepository schemaOrgHeaderRepository;
    @Autowired
    private GridFsTemplate gridFsTemplate;

    /**
     * Returns a single record specified by record-id
     */
    @RequestMapping(method = RequestMethod.GET)
    public RecordDTO getRecord(@RequestParam("record-id") String recordId){
        SchemaOrgHeader header = schemaOrgHeaderRepository.findById(recordId);
        List<GridFSDBFile> files = gridFsTemplate.find(new Query(Criteria.where("metadata.recordId").is(recordId)));
        return new RecordDTO(header, files);
    }

}

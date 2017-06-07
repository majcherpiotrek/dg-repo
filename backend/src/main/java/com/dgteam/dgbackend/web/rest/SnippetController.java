package com.dgteam.dgbackend.web.rest;

import com.dgteam.dgbackend.dto.SnippetDTO;
import com.dgteam.dgbackend.repository.SchemaOrgHeaderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Snippets Endpoint
 * Created by Adas on 2017-05-04.
 */
@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/snippets")
public class SnippetController {

    @Autowired
    private SchemaOrgHeaderRepository schemaOrgHeaderRepository;
    
    /**
     * Returns a list of snippets specified by record-name
     */
    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<SnippetDTO> get(@RequestParam("searchArg") String recordName) {
        return schemaOrgHeaderRepository.findAllBy(new TextCriteria().forDefaultLanguage().matchingAny(recordName))
                .stream()
                .map(SnippetDTO::new)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @RequestMapping(value = "/byAuthor", method = RequestMethod.GET)
    public List<SnippetDTO> getByAuthor(@RequestParam("searchArg") String author) {
        return schemaOrgHeaderRepository.findByAuthor(author)
                .stream()
                .map(SnippetDTO::new)
                .collect(Collectors.toList());
    }

}

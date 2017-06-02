package com.dgteam.dgbackend.service;

import com.mongodb.gridfs.GridFSDBFile;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Created by Adas on 2017-06-02.
 */
@Service
public class ZipService {

    public void makeAndForwardZip(List<GridFSDBFile> files, HttpServletResponse response) throws IOException {
        FileInputStream in;
        ZipOutputStream zos = new ZipOutputStream(response.getOutputStream());
        try{
            for (GridFSDBFile file : files) {
                String fileName = (String) file.getMetaData().get("fileName");
                file.writeTo(fileName);

                zos.putNextEntry(new ZipEntry(fileName));
                in = new FileInputStream(fileName);

                IOUtils.copy(in, zos);

                in.close();
                zos.closeEntry();

                new File(fileName).delete();
            }
            zos.close();
        }catch(IOException ex){
            ex.printStackTrace();
        }
    }


}

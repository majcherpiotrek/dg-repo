package com.dgteam.dgbackend.service;

import com.dgteam.dgbackend.domain.SchemaOrgHeader;
import com.mongodb.gridfs.GridFSDBFile;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * Created by Adas on 2017-06-02.
 */
@Service
public class ZipService {

    public void makeAndForwardZip(SchemaOrgHeader header, List<GridFSDBFile> files, HttpServletResponse response) throws IOException {
        FileInputStream in;
        ZipOutputStream zos = new ZipOutputStream(response.getOutputStream());
        try{
            String headerFileName = header.getName() + ".txt";
            File headerFile = new File(headerFileName);
            FileWriter writer = new FileWriter(headerFileName, true);
            writer.write(header.toString());
            writer.close();

            zos.putNextEntry(new ZipEntry(headerFileName));
            in = new FileInputStream(headerFileName);

            IOUtils.copy(in, zos);

            in.close();
            zos.closeEntry();
            headerFile.delete();

            if (files != null && files.size() > 0) {
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
            }
            zos.close();
        }catch(IOException ex){
            ex.printStackTrace();
        }
    }


}

package com.springboot.engine;

import com.springboot.models.JSONMessage;

import java.io.*;

public class CreateLogFile {


    public static void CreateLogTxtFiles(String path, String username, String content) throws IOException {
        File folders = new File(path + username);
        if (!folders.exists()) {
            try {
                folders.mkdirs();
                System.out.println("Multiple directories are created!");
            } catch (Exception e) {

                e.printStackTrace();
            }
        }

        File mytextfile = new File(path + username + "\\" + username + "-Log.txt");
        if (!mytextfile.exists()) {
            try {
                if (mytextfile.createNewFile()) {
                    BufferedWriter fileWriter = new BufferedWriter( new FileWriter(mytextfile));

                    fileWriter.append(content);
                    fileWriter.append(System.lineSeparator());
                    fileWriter.close();
                }
            } catch (Exception e) {

                e.printStackTrace();
            }
        } else {
            try {
                BufferedWriter fileWriter = new BufferedWriter( new FileWriter(mytextfile,true));

                fileWriter.append(content);
                fileWriter.append(System.lineSeparator());
                fileWriter.close();
            } catch (Exception e) {

                e.printStackTrace();
            }
        }
    }


    public static String TLJSONtoString(JSONMessage Message)
    {
        return
                Message.getUuid() + "   "
                        +"  User:  "+Message.getViewerUsername()
                        +"  Email:  "+Message.getViewerEmail()
                        +"   Viewed   "
                        +"  User:  " +Message.getViewedUsername()
                        +"  Email:  "+Message.getViewedEmail()
                        +"  's  "
                        +"  Travel:  "+Message.getViewedTravelName()
                        +"  TravelId:  " +Message.getViewedTravelId()
                        +"    AT    "+Message.getViewedDate();
    }

}

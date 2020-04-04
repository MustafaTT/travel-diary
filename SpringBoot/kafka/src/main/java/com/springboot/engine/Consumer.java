package com.springboot.engine;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.springboot.models.JSONMessage;
import com.springboot.models.JSONViewedTravel;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

import static com.springboot.engine.CreateLogFile.*;

@Service
public class Consumer {


    private String kafkaMessage;
    private JSONViewedTravel viewedTravel;
    private String username;
    private ObjectMapper mapper;
    private JSONMessage message;
    @KafkaListener(topics = "viewedTravel", groupId = "django-logpipe")
    public void consume(String message) throws IOException {
        this.kafkaMessage=message.substring(5);

        mapper = new ObjectMapper();
        viewedTravel = mapper.readerFor(JSONViewedTravel.class)
                .readValue(this.kafkaMessage);

        username =viewedTravel.getMessage().getViewedUsername();


        CreateLogTxtFiles("..\\..\\TravelViewLogs\\",username,TLJSONtoString(viewedTravel.getMessage()));


        System.out.print(TLJSONtoString(viewedTravel.getMessage())+"\n");
        
        



    }



        }











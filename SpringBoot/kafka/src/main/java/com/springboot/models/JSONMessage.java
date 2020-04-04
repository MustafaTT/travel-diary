package com.springboot.models;
import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
        "uuid",
        "viewer_username",
        "viewer_email",
        "viewed_email",
        "viewed_username",
        "viewed_travel_id",
        "viewed_travel_name",
        "viewed_date"
})
public class JSONMessage {

    @JsonProperty("uuid")
    private String uuid;
    @JsonProperty("viewer_username")
    private String viewerUsername;
    @JsonProperty("viewer_email")
    private String viewerEmail;
    @JsonProperty("viewed_email")
    private String viewedEmail;
    @JsonProperty("viewed_username")
    private String viewedUsername;
    @JsonProperty("viewed_travel_id")
    private String viewedTravelId;
    @JsonProperty("viewed_travel_name")
    private String viewedTravelName;
    @JsonProperty("viewed_date")
    private String viewedDate;
    @JsonIgnore
    private Map<String, Object> additionalProperties = new HashMap<String, Object>();

    @JsonProperty("uuid")
    public String getUuid() {
        return uuid;
    }

    @JsonProperty("uuid")
    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    @JsonProperty("viewer_username")
    public String getViewerUsername() {
        return viewerUsername;
    }

    @JsonProperty("viewer_username")
    public void setViewerUsername(String viewerUsername) {
        this.viewerUsername = viewerUsername;
    }

    @JsonProperty("viewer_email")
    public String getViewerEmail() {
        return viewerEmail;
    }

    @JsonProperty("viewer_email")
    public void setViewerEmail(String viewerEmail) {
        this.viewerEmail = viewerEmail;
    }

    @JsonProperty("viewed_email")
    public String getViewedEmail() {
        return viewedEmail;
    }

    @JsonProperty("viewed_email")
    public void setViewedEmail(String viewedEmail) {
        this.viewedEmail = viewedEmail;
    }

    @JsonProperty("viewed_username")
    public String getViewedUsername() {
        return viewedUsername;
    }

    @JsonProperty("viewed_username")
    public void setViewedUsername(String viewedUsername) {
        this.viewedUsername = viewedUsername;
    }

    @JsonProperty("viewed_travel_id")
    public String getViewedTravelId() {
        return viewedTravelId;
    }

    @JsonProperty("viewed_travel_id")
    public void setViewedTravelId(String viewedTravelId) {
        this.viewedTravelId = viewedTravelId;
    }

    @JsonProperty("viewed_travel_name")
    public String getViewedTravelName() {
        return viewedTravelName;
    }

    @JsonProperty("viewed_travel_name")
    public void setViewedTravelName(String viewedTravelName) {
        this.viewedTravelName = viewedTravelName;
    }

    @JsonProperty("viewed_date")
    public String getViewedDate() {
        return viewedDate;
    }

    @JsonProperty("viewed_date")
    public void setViewedDate(String viewedDate) {
        this.viewedDate = viewedDate;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

}

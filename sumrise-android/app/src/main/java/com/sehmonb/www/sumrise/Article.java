package com.sehmonb.www.sumrise;

import org.json.JSONObject;

/**
 * Created by Sehmon on 3/23/16.
 */
public class Article {

    private String title;
    private String summary;
    private String url;

    public static Article fromJSON(JSONObject jsonObject) {
        Article a = new Article();
        return a;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }


}

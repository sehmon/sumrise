package com.sehmonb.www.sumrise;

import android.support.v4.app.Fragment;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import org.json.JSONObject;

/**
 * A placeholder fragment containing a simple view.
 */
public class MainActivityFragment extends Fragment {

    FetchArticlesTask task = new FetchArticlesTask();
    String data =  "{\n" +
            "  \"success\": true,\n" +
            "  \"articles\": [\n" +
            "    {\n" +
            "      \"_id\": \"56ec6e66c4a23ed3af772234\",\n" +
            "      \"userId\": \"56ec6bc5f5b6dae7aec9b1f2\",\n" +
            "      \"date_added\": \"2016-03-18T21:08:54.185Z\",\n" +
            "      \"contents\": \"This is a summary, it was long lol.\",\n" +
            "      \"url\": \"www.testurl.com\",\n" +
            "      \"__v\": 0\n" +
            "    },\n" +
            "    {\n" +
            "      \"_id\": \"56ecb7587aae81b9b25c4283\",\n" +
            "      \"userId\": \"56ec6bc5f5b6dae7aec9b1f2\",\n" +
            "      \"date_added\": \"2016-03-19T02:20:08.927Z\",\n" +
            "      \"contents\": \"YAWKYAWKYAWKYAWK\",\n" +
            "      \"url\": \"www.yawkyawkyawk.com\",\n" +
            "      \"__v\": 0\n" +
            "    }\n" +
            "  ]\n" +
            "}";

    public MainActivityFragment() {
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_main, container, false);
    }



}

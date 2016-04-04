package com.sehmonb.www.sumrise;

import android.content.Context;
import android.net.Uri;
import android.os.AsyncTask;
import android.util.Log;
import android.widget.ArrayAdapter;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by Sehmon on 3/23/16.
 */
public class FetchArticlesTask extends AsyncTask<String, Void, String[]> {

    public static final int USER = 0;
    public static final int ARTICLE = 1;
    public static final int ALL_ARTICLES = 2;

    private static final String LOG_TAG = FetchArticlesTask.class.getSimpleName();

    private ArrayAdapter<String> mArticleAdapter;
    private Context mContext;
    private String endpoint;
    private String access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7InBhc3N3b3JkIjoiaW5pdCIsInVzZXJuYW1lIjoiaW5pdCIsIl9fdiI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsInVzZXJuYW1lIjp0cnVlLCJwYXNzd29yZCI6dHJ1ZSwiX2lkIjp0cnVlfSwibW9kaWZ5Ijp7fSwicmVxdWlyZSI6e319LCJzdGF0ZU5hbWVzIjpbInJlcXVpcmUiLCJtb2RpZnkiLCJpbml0IiwiZGVmYXVsdCIsImlnbm9yZSJdfSwiZW1pdHRlciI6eyJkb21haW4iOm51bGwsIl9ldmVudHMiOnt9LCJfZXZlbnRzQ291bnQiOjAsIl9tYXhMaXN0ZW5lcnMiOjB9fSwiaXNOZXciOmZhbHNlLCJfZG9jIjp7Il9fdiI6MCwidXNlcm5hbWUiOiJjYXBpdGFsb25lIiwicGFzc3dvcmQiOiIkMmEkMDUkYXV0MFRUQnRoTFZmeXFzTjJyQ2tELkJZR3l6Z1B6ME4vcUdLSVdheGUvNno5RVdwUUhFMi4iLCJfaWQiOiI1NmYxODI0ZGNjMjY2NDc3MjE2ZjkxODMifSwiX3ByZXMiOnsiJF9fb3JpZ2luYWxfc2F2ZSI6W251bGwsbnVsbCxudWxsXX0sIl9wb3N0cyI6eyIkX19vcmlnaW5hbF9zYXZlIjpbXX0sImlhdCI6MTQ1ODY2ODEzMX0.FaPXUMOLokyHuf7mnN7K6MpZXr42k3mmp7FWVJXFB5s";

    public FetchArticlesTask(Context context, ArrayAdapter<String> articleAdapter) {
        mContext = context;
        mArticleAdapter = articleAdapter;
    }

    public FetchArticlesTask() {
        Log.i(FetchArticlesTask.LOG_TAG, "Initializing Task");
    }

    @Override
    protected String[] doInBackground(String... params) {

        //Params should be:
        //[0] - Request constant
        //[1] - Optional parameters - Array Form:

        if(params.length == 0) {
            return null;
        }

        HttpURLConnection urlConnection = null;
        BufferedReader reader = null;

        String articleJsonString = null;

        String format = "json";

        try {
            final String ARTICLE_BASE_URL =
                    "45.55.186.89:3000/api/articles";

            Uri builtUri = Uri.parse(ARTICLE_BASE_URL);
            URL url = new URL(builtUri.toString());

            urlConnection = (HttpURLConnection) url.openConnection();
            urlConnection.setRequestMethod("GET");
            urlConnection.setRequestProperty("x-access-token", access_token);
            urlConnection.connect();

            InputStream inputStream = urlConnection.getInputStream();
            StringBuffer buffer = new StringBuffer();
            if(inputStream == null){
                return null;
            }

            reader = new BufferedReader(new InputStreamReader(inputStream));

            String line;
            while((line = reader.readLine()) != null){
                buffer.append(line+ "\n");
            }

            if (buffer.length() == 0){
                return null;
            }

            articleJsonString = buffer.toString();

        } catch (IOException e) {
            Log.e(LOG_TAG, "Error ", e);
            return null;

        } finally {
            if(urlConnection != null){
                urlConnection.disconnect();
            }

            if(reader != null){
                try {
                    reader.close();
                } catch (final IOException e){
                    Log.i(LOG_TAG, "Error closing stream", e);
                }
            }
        }

        try {
            Log.e(LOG_TAG, articleJsonString);
        } catch (Exception e){
            e.printStackTrace();
        }

        return null;
    }

    @Override
    protected void onPostExecute(String[] result){
        if(result != null){
            Log.i(LOG_TAG, result.toString());
        }
    }
}

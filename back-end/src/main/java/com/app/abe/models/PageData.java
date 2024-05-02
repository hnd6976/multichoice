package com.app.abe.models;

import java.util.List;

/**
 * Page of data modeled as database rows of an object with type T
 * 
 * @author cook
 * @param <T> Type of object in list of rows, in the page content
 */
public class PageData<T>  {

    // Number of rows in page (content length)
    public int pageSize;
    // Total number of pages in database table (= total rows / page size)
    public int totalPages;
    // Page content is a list of rows from database. Each row is an object
    // of type T
    public int totalElement;
    public List<T> content;

    public PageData() {
    }
    public PageData(int pageSize, int totalPages,int totalElement, List<T> content) {
        this.pageSize = pageSize;
        this.totalPages = totalPages;
        this.totalElement=totalElement;
        this.content = content;
    }
    
}


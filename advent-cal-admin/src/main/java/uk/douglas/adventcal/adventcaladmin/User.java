package uk.douglas.adventcal.adventcaladmin;

import lombok.AllArgsConstructor;
import org.hibernate.validator.constraints.NotEmpty;

import java.io.Serializable;
import java.util.List;

@AllArgsConstructor
public class User implements Serializable {
    @NotEmpty
    private final int id;
    @NotEmpty
    private final String userName;
    @NotEmpty
    private final String theme;
    @NotEmpty
    private final String password;
    @NotEmpty
    private final List<String> images;


    public int getId(){
        return id;
    }

    public String getUserName(){ return userName; }

    public String getTheme(){
        return theme;
    }

    public String getPassword(){
        return password;
    }

    public List<String> getImages(){
        return images;
    }
}

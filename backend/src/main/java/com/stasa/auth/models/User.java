package com.stasa.auth.models;

import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {

	private static final long serialVersionUID = 4408418647685225829L;
	public String uid;
	public String name;
	public String email;
	public boolean isEmailVerified;
	public String issuer;
	public String picture;


}

package com.teras.common.util;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatUtil {
	static SimpleDateFormat dayFormat = new SimpleDateFormat("yyyy-mm-dd");
	static SimpleDateFormat monthFormat = new SimpleDateFormat("yyyy-mm");
	static SimpleDateFormat yearFormat = new SimpleDateFormat("yyyy");

	public static String getDate(String date) {
		return dayFormat.format(date);
	}

	public static String getMonth(String date) {
		return monthFormat.format(date);
	}
	
	public static String getYear(String date) {
		return yearFormat.format(date);
	}
}

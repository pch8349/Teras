package com.teras.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 196685614L;

    public static final QUser user = new QUser("user");

    public final EnumPath<com.teras.common.model.column.TerasAuthority> authority = createEnum("authority", com.teras.common.model.column.TerasAuthority.class);

    public final StringPath email = createString("email");

    public final StringPath emergencyPhoneNumber = createString("emergencyPhoneNumber");

    public final StringPath grade = createString("grade");

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final StringPath schoolCode = createString("schoolCode");

    public final StringPath subjectCode = createString("subjectCode");

    public final StringPath userClass = createString("userClass");

    public final StringPath userId = createString("userId");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}


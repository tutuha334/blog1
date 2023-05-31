import sqlite3

database = 'web_blog/database.sqlite'

def init_db():
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("""
    CREATE table users (
        id integer primary key,
        login text,
        password text,
        name text    
    );
    """)
    cursor.execute("""
    CREATE table posts (
        id integer primary key,
        text_post text,
        likes integer,
        author_id integer,
        FOREIGN KEY (author_id) REFERENCES users (id)
    );
    """)
    cursor.execute("""
    CREATE table likes (
        id integer primary key,
        post_id integer,
        user_id integer,
        FOREIGN KEY (post_id) REFERENCES posts (id)
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
    """)
    cursor.execute("""
    CREATE table subs (
        id integer primary key,
        user_id integer,
        subs_id integer,
        FOREIGN KEY (subs_id) REFERENCES users (id)
        FOREIGN KEY (user_id) REFERENCES users (id)
    );
    """)
    connect.close()

def check_login(login):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT login FROM users")
    res = cursor.fetchall()
    for i in res:
        if login == i[0]:
            return True

def check_user(login, password):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM users where login='"+login+"'")
    res = cursor.fetchall()
    connect.close()
    if res:
        if res[0][2] == password:
            return True

def add_user(name,login,password):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT id FROM users")
    try:
        new_id = str(cursor.fetchall()[-1][0] + 1)
    except:
        new_id = 1
    cursor.execute("insert into users values ("+str(new_id)+",'"+login+"','"+password+"','"+name+"')")
    connect.commit()
    connect.close()

def get_user(login):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM users where login='"+login+"'")
    res = cursor.fetchall()
    connect.close()
    name = res[0][3]
    user_id = res[0][0]
    posts = get_user_posts(res[0][0])
    info = {
        "id":user_id,
        "name":name,
        "posts":posts
    }
    return info

def get_user_posts(id):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM posts where author_id="+str(id))
    res = cursor.fetchall()
    connect.close()
    for i in range(0,len(res)):
        res[i] = list(res[i])
    return res

def add_post(text,user):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT id FROM posts")
    try:
        new_id = str(cursor.fetchall()[-1][0] + 1)
    except:
        new_id = 1
    user_id = get_user(user)["id"]
    cursor.execute("insert into posts values ("+str(new_id)+",'"+text+"',0,"+str(user_id)+")")
    connect.commit()
    connect.close()

def get_subscriptions(login):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("""
        SELECT u2.login, u2.name
        FROM users u1, users u2, subs
        WHERE u1.id=subs.user_id and u2.id=subs.subs_id and u1.login='"""+login+"""'
    """)
    res = cursor.fetchall()
    connect.close()
    for i in range(0,len(res)):
        res[i] = list(res[i])
    return res

def get_subscribers(login):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("""
        SELECT u1.login, u1.name  
        FROM users u1, users u2, subs
        WHERE u1.id=subs.user_id and u2.id=subs.subs_id and u2.login='"""+login+"""'
    """)
    res = cursor.fetchall()
    connect.close()
    for i in range(0,len(res)):
        res[i] = list(res[i])
    return res

def delete_subscriptions(user,subs):
    user_id = get_user(user)["id"]
    subs_id = get_user(subs)["id"]
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("delete FROM subs WHERE user_id="+str(user_id)+" and subs_id="+str(subs_id))
    connect.commit()
    connect.close()

def add_subscriptions(user,subs):
    user_id = get_user(user)["id"]
    subs_id = get_user(subs)["id"]
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT id FROM subs")
    try:
        new_id = str(cursor.fetchall()[-1][0] + 1)
    except:
        new_id = 1
    cursor.execute("insert into subs values ("+str(new_id)+","+str(user_id)+","+str(subs_id)+")")
    connect.commit()
    connect.close()



def get_db(table):
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("SELECT * FROM "+table)
    result = cursor.fetchall()
    connect.close()
    return result


def delete_recipe():
    connect = sqlite3.connect(database)
    cursor = connect.cursor()
    cursor.execute("delete from users where id=2")
    cursor.execute("delete from users where id=3")
    cursor.execute("delete from users where id=4")
    cursor.execute("delete from users where id=5")
    cursor.execute("delete from users where id=6")
    cursor.execute("delete from users where id=7")
    cursor.execute("delete from users where id=8")
    cursor.execute("delete from users where id=9")
    connect.commit()
    connect.close()

# DB STRUCTURE
## Create the project

composer create-project --prefer-dist laravel/laravel blog

## create blogs Migrations

`php artisan make:migration blogsTable`

Creating table with columns

```
Schema::create('blogs', function(Blueprint $table){
  $table->increments('id');
  $table->string('title', 255);
  $table->text('post');
  $table->timestamps();
});
```

```
Schema::drop('password_resets');
```

## Create Foreign Key

`php artisan make:migration blogsfk`

Modify a table and make a fk field

* Use table function to refer to table

```
Schema::table('blogs', function(Blueprint $table){
  $table->integer('user_id')->unsigned();
  $table->foreign('user_id')
        ->references('id')->on('users')
        ->onDelete('cascade')
        ->onUpdate('cascade');
});
```

* start by deleting the foreign key
* Columns to be deleted put in as an array
```
Schema::table('blogs', function (Blueprint $table) {
  $table->dropForeign('blogs_user_id_foreign');
  $table->dropColumn(['user_id']);
});
```

## Creates comments table

`php artisan make:migration comments`

* foreign keys on table creation
```
Schema::create('comments', function(Blueprint $table){
  $table->increments('id');
  $table->string('comment');
  $table->integer('blog_id')->unsigned();
  $table->integer('user_id')->unsigned();

  $table->foreign('blog_id')
        ->references('id')->on('blogs')
        ->onDelete('cascade')
        ->onUpdate('cascade');
  $table->foreign('user_id')
        ->references('id')->on('users')
        ->onDelete('cascade')
        ->onUpdate('cascade');
});
```

* Drop the table
```
Schema::drop('comments');
```

## Create the tags table
`php artisan make:migration tags`

```
Schema::create('tags', function(Blueprint $table){
  $table->increments('id');
  $table->string('tag', 30);
});
```

`Schema::drop('tags');`

## blog_tags
`php artisan make:migration blog_tags`

* with composite key
```
Schema::create('blog_tags', function(Blueprint $table){
  $table->integer('blog_id')->unsigned();
  $table->integer('tag_id')->unsigned();

  $table->primary(['blog_id', 'tag_id']);

  $table->foreign('blog_id')
        ->references('id')->on('blogs')
        ->onDelete('cascade')
        ->onUpdate('cascade');

  $table->foreign('tag_id')
        ->references('id')->on('tags')
        ->onDelete('cascade')
        ->onUpdate('cascade');
});
```

`Schema::drop('comments');`

## Migration instructions
1. `php artisan make:migration create_users_table --create=users`

    create an initial migration for users
2. `php artisan make:migration add_votes_to_users_table --table=users`

    create a migration to modify a table
3. `php artisan migrate`

    run unrecorded migrations
4. `php artisan migrate --force`

    force a migration

5. `php artisan migrate:rollback`

    rolls back the last batch
6. `php artisan migrate:rollback --step=5`

    roll back to a specific point in the past
7. `php artisan migrate:reset`

    roll back all migrations
8. `php artisan migrate:refresh`

    roll back all migrations then recreate them

*Reference:* [Database Migrations](https://laravel.com/docs/5.3/migrations)

# CREATE MODELS & RELATIONSHIPS

*Convention*: Use the name of the tables and in singular
1. Users Table **Already built**
    * blogs
      ```
      public function blogs(){
        return $this->hasMany('App\Blog');
      }
      ```
    * Comments
      ```
      public function comments(){
        return $this->hasMany('App\Comment');
      }
      ```
2. Blogs Table `php artisan make:model Blog`
    * Blog_tags
      ```
      public function blog_tags(){
        return $this->hasMany('App\Blog_tag');
      }
      ```
    * Comments
      ```
      public function comments(){
        return $this->hasMany('App\Comment');
      }
      ```

    * User
      ```
      public function user(){
        return $this->belongsTo('App\User');
      }
      ```
3. Comments Table `php artisan make:model Comment`
    * Blog
      ```
      public function blog(){
        return $this->belongsTo('App\Blog');
      }
      ```
    * User
      ```
      public function user(){
        return $this->belongsTo('App\User');
      }
      ```
4. Tags Table `php artisan make:model Tag`
    * BlogTags
      ```
      public function blog_tags(){
        return $this->hasMany('App\Blog_tag');
      }
      ```

5. Blog Tags Table `php artisan make:model Blog_tag`

    `public $timestamps = false;`
    * Blog
      ```
      public function blog(){
        return $this->belongsTo('App\Blog');
      }
      ```
    * Tag
      ```
      public function tag(){
        return $this->belongsTo('App\Tag');
      }
      ```

*Reference:* [Eloquent Relationships](https://laravel.com/docs/5.3/eloquent-relationships)

# CREATE DUMMY DATA(SEEDS)
`php artisan db:seed`

1. Users Table `php artisan make:seeder UsersTableSeeder`
    ```
    factory(App\User::class, 10)->create();
    ```
2. Blogs table `php artisan make:seeder BlogsTableSeeder`

    ```
    foreach (User::all() as $user)
    {
      for($i=0; $i<4; $i++)
      {
        Blog::create([
          'title'=>'Title 1 by '.$user['id'],
          'post'=>'Post 1 by '.$user['id'],
          'user_id'=>$user['id']
        ]);
      }
    }
    ```
3. Tags Table `php artisan make:seeder TagsTableSeeder`

    ```
    $tags=['technology','entertainment','leisure','sports','fashion','politics','business'];
    foreach ($tags as $tag) {
      Tag::create(['tag'=>$tag]);
    }
    ```
4. Blog_tags Table `php artisan make:seeder BlogtagsTableSeeder`

   ```
   public function run()
   {
     $tags = $this->tag_ids();

     foreach (Blog::all() as $blog) {
       //print_r($blog['id']);
       $random_tags = array_rand($tags,3);
       foreach ($random_tags as $tag_index) {
         Blog_tag::create(['tag_id'=>$tags[$tag_index], 'blog_id'=>$blog['id']]);
       }
     }
   }

   private function tag_ids(){
     $tags=Tag::select('id')->get();
     $tag_ids = [];
     foreach ($tags as $tag) {
       array_push($tag_ids, $tag['id']);
     }
     return $tag_ids;
   }
   ```

# LARAVEL TINKER
`php artisan tinker`

1. Get all users `App\User::all();`

2. find a specific user. `$user=App\User::find(9);`

3. Find their blogs `$user->blogs;`

4. Find blog with its users `App\Blog::find(1)->user`

5. Find user and their blogs with where clause `App\User::with('blogs')->where(['id'=>'3'])->get()`

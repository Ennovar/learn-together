# Up and Running

A simple Laravel web app implementing Authentication and Blog API

# Start with this basic repo

* Have [Composer](https://getcomposer.org/) installed in your system. 
* Clone repo
* Run `Composer update` to get all dependencies installed
* Make copy on *.env.example* file set the right configuration and save that as `.env`
* run migration `php artisan migrate`
* Run your app `php artisan serve`

For more info visit the [Laravel site](https://laravel.com/).



# Initial installation can be a headache

You need to have [Composer](https://getcomposer.org/), php and a good db to work with Laravel. Vagrant is recommended but it can be a headache to set up. 

Easy way around, install [XAMPP](https://www.apachefriends.org/index.html), or [MAMP](https://www.mamp.info/en/), or install php and db seperately... *Just have them running* 

Install Composer and link it to your php executable file. 

Once you have Composer running you can make a new app in your desired location, `composer create-project --prefer-dist laravel/laravel blog`


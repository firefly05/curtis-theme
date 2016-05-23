<?php 

// loading modernizr and jquery, and reply script
add_action('wp_enqueue_scripts', function() {
  global $wp_styles; // call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way
  if (!is_admin()) {
      wp_deregister_script('jquery' );


    /**
    *
    * CSS Stylesheets
    *
    **/
    wp_enqueue_style( 'dashicons' );
    wp_register_style( 'foundation-css', get_template_directory_uri() . '/css/foundation.css' );
    wp_register_style( 'custom-css', get_template_directory_uri() . '/css/custom.css', array('foundation-css'), '20120208', 'all' );
      

    /**
    *
    * Javascripts 
    **/
    


    // modernizr
    wp_register_script( 'modernizr', get_template_directory_uri() . '/js/modernizr-ck.js' );
    
    // adding Foundation scripts file in the footer
    wp_register_script( 'foundation-js', get_template_directory_uri() . '/js/foundation.min-ck.js', array( 'vendor-js' ), '201411', true );
    wp_register_script( 'vendor-js', get_template_directory_uri() . '/js/vendor/jquery-ck.js', array(), '20120208', true );

    // adding slick slider
    wp_register_script( 'slick-js', get_template_directory_uri() . '/js/slick/slick.min.js', 'vendor-js', '201411', true );
    wp_register_style( 'slick-css', get_template_directory_uri() .'/js/slick/slick.css', 'custom-css', '201411', 'all' );

    //adding scripts file in the footer
    wp_register_script( 'scripts-js', get_stylesheet_directory_uri() . '/js/scripts.js', array( 'foundation-js' ), '', true );

    // enqueing styles:
    wp_enqueue_style( 'foundation-css' );
    wp_enqueue_style( 'custom-css' );
    wp_enqueue_style( 'slick-css' );


    // enqueue scripts
    wp_enqueue_script( 'modernizr' );
    wp_enqueue_script ('foundation-js');
    wp_enqueue_script ('vendor-js');
    wp_enqueue_script ('scripts-js');
    wp_enqueue_script ('slick-js');


    

  }
});



add_theme_support( 'post-thumbnails' );
set_post_thumbnail_size( 604, 270, true );
add_image_size( 'header-cards', 600, 250, true );
add_image_size( 'two-third', 670, 310, true );
add_image_size( 'one-half', 505 );
add_image_size( 'one-third', 335 );
add_image_size( 'three-third', 1000 );
add_image_size( 'seven', 587 );
add_image_size( 'five', 420 );
add_image_size( 'slideshow_large', '600', 400, true );

//get parent category
function cgp_get_parent_category($cat_id){
    //firstly, load data for your child category
    $child = get_category($cat_id);

    if($child->parent!=0):
        //from your child category, grab parent ID
        $parent = $child->parent;
        //load object for parent category
        $parent_name = get_category($parent);

        //grab a category name
        $parent_name = $parent_name->slug;
    else:
        $parent_name = $child->slug;
    endif;

    return $parent_name;
}

/**
*
* custom functions
*
**/

//check if the post has a gallery
function cgp_post_has_gallery(){

    if (strpos($post->post_content,'[gallery') === true){
      return true;
    }

}



/**
*
* favicon
*
**/
add_action( 'wp_head', 'ilc_favicon');
function ilc_favicon(){
  echo '<link href="' . get_stylesheet_directory_uri() . '/img/favicon.ico" rel="shortcut icon" />';
}



 ?>
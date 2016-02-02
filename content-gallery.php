<?php 
    // get all posts in the gallery
    if ( get_post_gallery() ) : ?>
    <div class="gallery columns medium-8" style="margin:0 auto">
      
      <?php
        $gallery = get_post_gallery( get_the_ID(), false );
        $images = explode(',',$gallery['ids']);
        $image_size = 'slideshow_large';

        /* Loop through all the image and output them one by one */
        foreach( $images AS $image )
        {
            $src = wp_get_attachment_image_src( $image, $image_size);
            ?>
            
            <img src="<?php echo $src[0]; ?>" class="gallery-image" alt="Gallery image" />
            
            <?php
        } ?> 
    </div>
<?php endif; ?>
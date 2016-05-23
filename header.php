<!doctype html>
<html class="no-js" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Curtis Peters | Toronto Full-stack web developer</title>

    <?php wp_head(); ?>
   
  </head>
  <body>
      
  <div class="header clearfix">
    
      <div class="medium-3 columns branding-column flush">

        <div class="card brand-card-wrap">
          <div class="card-inner brand-card-inner">
            
            <div class="brand-card">
              <h1 class="brand"><span class="curtis">curtis</span> <span class="peters">Peters</span></h1>
              <h2>Toronto-based WordPress developer</h2>
              <p>When I'm not serving up custom WordPress themes and plugins for business owners, I'm keeping sharp with these personal projects.
              </p>
            </div>
          </div><!-- card inner -->
      
      </div><!-- card -->
        
      </div>
      <div class="medium-9 columns portfolio-column flush">

          <div class="header-cards clearfix">
              <?php 

            $portfolios = get_posts('cat=15&posts_per_page=3' );
            $count = 0;
            foreach ($portfolios as $post) :
              setup_postdata( $post );
              $count++;
              
              //prepare thumbnail image
              // set it to the appropriate size
              $sized_thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), 'five');
              $full_image = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), 'slideshow_large');

                

                // get category name from custom function
             $cat = get_the_category(get_the_ID() );
             $category= cgp_get_parent_category($cat[0]->cat_ID);

              //get link to demo if available (for websites) else just get link to post (for images)
             if(get_field('link_to_demo')) { 
                $link = get_field('link_to_demo');
                $target='target="_blank"';
              }else{
                $link = get_permalink() . "#content";
                $target="";
              } 

                ?>

                  <div class="medium-4 columns card">
                    <div class="card-inner">
                      <div class="image" style="background: url(<?php echo $sized_thumb[0]; ?>)"> </div>
                      <?php //the_post_thumbnail('header-cards' ); ?>
                      <div class="summary-card">
                        <h2 class="summary-title"><a href="<?php echo $link ?>" <?php echo $target; ?>><?php the_title(); ?></a></h2>
                      </div>
                    </div><!-- card inner -->
                      <div class="card-button-row">
                        <a href="<?php echo $link ?>" <?php echo $target; ?> class="card-link <?php echo $category; ?>"><span class="hide-text">Visit Page</span></a>
                        <a href="#" class="show-details card-link hide-for-small" data-window-id=<?php echo $post->ID ?>><span class="hide-text">Details</span></a>
                      </div>
                  </div><!-- card -->
                    <?php include(locate_template('content-details.php')); ?>


            <?php
              endforeach;
              wp_reset_postdata();
               ?>

            
          </div><!-- header cards -->
          <div class="cta small-pull-2">
            <a href="#content" class="more-content centered hide-for-small">more</a>
          </div>
          
        </div><!-- base-card header -->
    </div>

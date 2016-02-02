<?php get_header( ); ?>

<div class="row content" id="content">
  <div class="content-header clearfix">

    <h1><?php single_post_title(); ?></h1>
    <?php get_template_part( 'content', 'gallery' ); ?>
  </div>

  <?php get_template_part( 'content', 'portfolio' ); ?>
  </div><!-- content -->
  <?php get_footer(); ?>
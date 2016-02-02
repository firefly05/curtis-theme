

<?php 
$portfolios = get_posts('cat=15&orderby=rand&posts_per_page=-1' );

$second_column = "";
$count = "0";
$total = count($portfolios);
foreach ($portfolios as $post) :
  setup_postdata( $post );

  $int = rand(1,3);
  $count++;

  if ($second_column=="") :
    switch ($int) {
      case '1':
        $col = 7;
        $second_column = 5;
        break;

      case '2':
        $col = 8;
        $second_column = 4;
        break;

      case '3':
        $col = 6;
        $second_column = 6;
        break;
      
      default:
        $col = 7;
        $second_column = 5;
        break;
    }
  else :
    //if this isn't the first time through the loop, this is the second column of the rowo
    // add the appropriate column count
    $col = $second_column;
    $second_column = "";
  endif;

if ($count == $total && $count%2=="1") {
    $col='12';
  }
  
  switch ($col) {
    case '7':
      $img_width = "seven";
      break;
    case '8':
      $img_width = "two-third";
      break;
    case '6':
      $img_width = "one-half";
      break;
    case '4':
      $img_width = "one-third";   
      break;
    case '5':
      $img_width = "five";
      break;
    case '12':
      $img_width = "three-third";
      break;
  }


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
 // setup the thumbnail based on the size of the column generated
 $sized_thumb = wp_get_attachment_image_src( get_post_thumbnail_id(get_the_ID()), $img_width);
 ?>
    <div class="medium-<?php echo $col; ?> columns card <?php echo $category; ?>">
      <div class="card-inner">
          <?php $thumb = $sized_thumb[0]; ?>
          <div class="image" style="background: url(<?php echo $thumb; ?>)"> </div>
          <div class="summary-card">
            <h2 class="summary-title"><a href="<?php echo $link ?>" <?php echo $target; ?>><?php the_title(); ?></a></h2>
          </div>
      </div><!-- card inner -->
      </div>
      
  <?php
  endforeach;
  wp_reset_postdata();
   ?>
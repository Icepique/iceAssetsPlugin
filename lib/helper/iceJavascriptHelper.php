<?php

$configuration = sfProjectConfiguration::getActive();
$configuration->loadHelpers(array('JavascriptBase'));

/**
 * Render a Google AdManager ad slot
 *
 * @param  string   $slot  Which ad slot to load
 * @param  int      $width  The width of the ad slot
 * @param  int      $height  The height of the ad slot
 * @param  boolean  $delayed  Whether to delay the loading of the ad until page load.
 *                            Delayed loading does not work with ajax calls so set to false in those cases.
 * @return void
 */
function ice_ad_slot($slot, $width, $height, $delayed = true)
{
  $config = sfConfig::get('app_ice_ads', array());

  if (isset($config['slots'][$slot]) && $config['slots'][$slot] === false)
  {
    return;
  }
  else if (sfConfig::get('sf_environment') != 'prod')
  {
    echo sprintf(
      '<div style="margin: auto; width: %dpx; height: %dpx; background: #59CF76; border: 1px solid #00AC52; position: relative;">',
      $width, $height
    );
    echo sprintf('<div style="position: absolute; bottom: 5px; right: 5px; color: #638606; font-size: 14px; font-weight: bold;">%dx%d</div>', $width, $height);
    echo '</div>';
  }
  else if ($delayed == true)
  {
    $request = sfContext::getInstance()->getRequest();
    $slots = $request->getAttribute('slots', array(), 'ice/view/ads');

    echo sprintf(
      '<div id="ad_slot_%s" style="width: %dpx; height: %dpx; line-height: %dpx; margin: auto;">&nbsp;</div>',
      $slot, $width, $height, $height
    );

    $slots[] = $slot;
    $request->setAttribute('slots', $slots, 'ice/view/ads');
  }
  else
  {
    echo sprintf(
      '<div align="center"><iframe src="/ad_slot.php?slot=%1$s" id="ad_slot_%1$s" frameborder="0" border="0" cellspacing="0" scrolling="no" marginwidth="0" marginheight="0" style="border: 0; width: %2$dpx; height: %3$dpx; padding: 0; margin: 0;" width="%2$d" height="%3$d"></iframe></div>',
      $slot, $width, $height
    );
  }
}

/**
 * Add attribute to be send to Google AdManager for custom targeting
 *
 * @see  http://www.google.com/support/dfp_sb/bin/answer.py?answer=91225
 *
 * @param  string  $key
 * @param  mixed   $value
 */
function ice_ad_attribute($key, $value)
{
  $request = sfContext::getInstance()->getRequest();
  $attributes = $request->getAttribute('attributes', array(), 'ice/view/ads');
  $attributes = array_merge($attributes, array($key => $value));

  $request->setAttribute('attributes', $attributes, 'ice/view/ads');
}

function ice_javascript_tag()
{
  ob_start();
  ob_implicit_flush(0);
}

function ice_end_javascript_tag($position = 'back')
{
  $request = sfContext::getInstance()->getRequest();
  $contents = $request->getAttribute('contents', '', 'ice/view/javascripts');

  $script = ob_get_clean();
  $script = str_replace(
    array('<script type="text/javascript">', '<script>', '</script>'), '', $script
  );

  $contents = ($position == 'front') ? $script ."\n\n". $contents : $contents ."\n\n". $script;
  $request->setAttribute('contents', $contents, 'ice/view/javascripts');
}

function ice_echo_javascripts()
{
  $request = sfContext::getInstance()->getRequest();
  $contents = $request->getAttribute('contents', '', 'ice/view/javascripts');

  if (!empty($contents))
  {
    if (function_exists('jsmin'))
    {
      $contents = (sfConfig::get('sf_environment') == 'prod') ? jsmin($contents) : $contents;
    }
    else
    {
      include_once dirname(__FILE__).'/../../../iceLibsPlugin/lib/vendor/JavaScriptMinify.class.php';

      try
      {
        $contents = (sfConfig::get('sf_environment') == 'prod') ? JavaScriptMinify::minify($contents) : $contents;
      }
      catch (Exception $e) { ; }
    }

    echo content_tag('script', javascript_cdata_section(trim($contents)), array('type' => 'text/javascript'));
  }
}

<?php

/**
 * Displays synchrona configuration menu
 */
function DisplayAbout()
{

    $Parsedown = new Parsedown();
    $strContent = file_get_contents($_SERVER['DOCUMENT_ROOT'].'/BACKERS.md');
    $sponsorsHtml = $Parsedown->text($strContent);

    echo renderTemplate("about", compact('sponsorsHtml'));
}


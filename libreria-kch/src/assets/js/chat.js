$(function() {
  'use strict';

  // Applying perfect-scrollbar 
  if ($('.chat-aside .tab-content').length) {
    const sidebarBodyScroll = new PerfectScrollbar('.chat-aside .tab-content');
  }
  if ($('.chat-content .chat-body').length) {
    const sidebarBodyScroll = new PerfectScrollbar('.chat-content .chat-body');
  }

  $( '.chat-list .chat-item' ).each(function(index) {
    $(this).on('click', function(){
        $('.chat-content').toggleClass('show');
    });
  });

  $('#backToChatList').on('click', function(index) {
    $('.chat-content').toggleClass('show');
  });

});
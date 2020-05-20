<header id="header" class="header">
  <div class="wrapper">
    <div id="header-inner" class="inner">
      <h1 id="logo-wrap">
        <a href="/zh-cn/" id="logo">Feflow</a>
      </h1>
      <nav id="main-nav">
        {{ header_menu('main-nav') }}
        <!-- <a href="http://2019-en.tlc.ivweb.io" class="main-nav-link">English</a> -->
      </nav>
      <div id="buy-ticket">
        <span href="https://www.bagevent.com/event/6442240" class="buy-ticket-link" target="_blank"
              onclick="window.location.href=window.location.href.match(/(^|&|\?)discountCode=([^&]*)(&|$)/) && window.location.href.match(/(^|&|\?)discountCode=([^&]*)(&|$)/).length > 0 ? 'https:\/\/www.bagevent.com/event/6442240?discountCode=' + window.location.href.match(/(^|&|\?)discountCode=([^&]*)(&|$)/)[2] : 'https:\/\/www.bagevent.com/event/6442240'">立即购票</span>
      </div>
      <div id="lang-select-wrap">
        <label id="lang-select-label"><i class="fa fa-globe"></i><span>简体中文</span></label>
        <select id="lang-select" data-canonical="">

            <option value="zh-cn" selected>简体中文</option>

        </select>
      </div>
      <a id="mobile-nav-toggle">
        <span class="mobile-nav-toggle-bar"></span>
        <span class="mobile-nav-toggle-bar"></span>
        <span class="mobile-nav-toggle-bar"></span>
      </a>
    </div>
  </div>
</header>

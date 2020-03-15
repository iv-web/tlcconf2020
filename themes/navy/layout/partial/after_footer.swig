<!-- Scripts -->
<!-- build:js build/js/main.js -->
<script src="https://11.url.cn/now/lib/jquery/1.11.1/jquery.min.js"></script>
<script src="https://11.url.cn/now/lib/axios/0.18.0/axios.min.js"></script>
<script src="https://11.url.cn/now/lib/swig/1.4.2/swig.min.js"></script>
<script src="//res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
{{ js('js/unslider.min.js') }}
{{ js('js/slider.js') }}
{{ js('js/lang_select') }}
{{ js('js/toc') }}
{{ js('js/mobile_nav') }}
{{ js('js/data') }}
{{ js('js/carousel') }}
{{ js('js/share')}}
{{ js('js/mta')}}
<!-- endbuild -->
{% if page.layout === 'plugins' %}
<!-- Plugin search -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/lunr.js/2.1.2/lunr.min.js"></script>
<!-- Lazy load -->
<script async src="https://cdn.jsdelivr.net/lazysizes/3.0.0/lazysizes.min.js"></script>
<!-- build:js build/js/plugins.js -->
<!--axios-->
<script src="https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js"></script>
{{ js('js/plugins') }}
<!-- endbuild -->
{% endif %}

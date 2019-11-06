<h1>List</h1>
{% assign udocuments = site.documents %}
<ul class="uk-list">
{% for upage in udocuments %}
  <li><a href="{{ upage.url }}">{{ upage.title }}</a> - {{ upage.categories }}</li>
{% endfor %}
</ul>

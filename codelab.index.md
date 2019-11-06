---
title: 'CodeLab'
description: 'Сборник всех наших "проектов"'
layout: default
permalink: /codelab/index.html
---

# Добро пожаловать


{% assign udocuments = site.documents | where: "categories", "modules" %}
<ul class="uk-list">
{% for upage in udocuments %}
  <li><a href="{{ upage.url }}">{{ upage.title }}</a> - {{ upage.categories }}</li>
{% endfor %}
</ul>



<ul>
{% for upage in site['arduino'] %}
  <li><a href="{{ upage.url }}">{{ upage.title }}</a></li>
{% endfor %}
</ul>



{% for collection in site.collections %}
  <h2>Items from {{ collection.label }}</h2>
  <ul>
    {% for item in site[collection.label] %}
      <li><a href="{{ item.url }}">{{ item.title }}</a></li>
    {% endfor %}
  </ul>
{% endfor %}

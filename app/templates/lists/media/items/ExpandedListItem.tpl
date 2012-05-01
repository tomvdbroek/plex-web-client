<a href="#!/servers/{{serverID}}/sections/{{sectionID}}/details/{{item.ratingKey}}">
	{{#if item.rating}}<span class="rating">{{starRating item.rating}}</span>{{/if}}
	<h3 class="poster-title">{{truncate item.title 40}}</h3>
</a>

<a class="poster-link" href="#!/servers/{{serverID}}/sections/{{sectionID}}/details/{{item.ratingKey}}">
	<img class="poster" data-original="{{transcodeImage item.thumb 80 130}}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAB4CAIAAADqjOKhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1MzdGRTM5ODhCRTExMUUxOUU2NEZGRkExMDYyRTE2OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo1MzdGRTM5OThCRTExMUUxOUU2NEZGRkExMDYyRTE2OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjUzN0ZFMzk2OEJFMTExRTE5RTY0RkZGQTEwNjJFMTY4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjUzN0ZFMzk3OEJFMTExRTE5RTY0RkZGQTEwNjJFMTY4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+4i5b5wAAG3pJREFUeNqkXdlz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" alt="{{item.title}}">
</a>

<div class="list-detail">
	{{#if item.tagline}}
		<div class="list-tagline">{{truncate item.tagline 55}}</div>
	{{/if}}

	{{#if item.studio}}
		<span class="list-label">Studio</span> {{item.studio}}<br>
	{{/if}}

	{{#if item.originallyAvailableAt}}
		<span class="list-label">{{eq item.type "show" "Start Date" "Release Date"}}</span> {{formatDate item.originallyAvailableAt}}<br>
	{{else}}
		{{#if item.year}}
			<span class="list-label">Year</span> {{item.year}}<br>
		{{/if}}
	{{/if}}

	{{#if item.duration}}
		<span class="list-label">{{eq item.type "show" "Episode Duration" "Duration"}}</span> {{formatDuration item.duration}}
	{{/if}}
</div>
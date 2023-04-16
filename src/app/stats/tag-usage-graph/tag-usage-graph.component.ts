import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Subscription } from 'rxjs';

import { TagService } from 'src/app/tags/tags.service';
import { BookService } from 'src/app/books/book.service';
import { Tag } from 'src/app/tags/tag.model';

@Component({
  selector: 'app-tag-usage-graph',
  templateUrl: './tag-usage-graph.component.html',
  styleUrls: ['./tag-usage-graph.component.css']
})
export class TagUsageGraphComponent implements OnInit, OnDestroy
{
	// Attributes
	public tagUsageChart: Chart;
	private subscription: Subscription;

	// Data
	public averageTagsPerBook: number = 0;
	private topTags: Tag[] = [];

	// Methods
	constructor(private tagService:TagService, private bookService:BookService) { }

	ngOnInit(): void 
	{ 
		this.updateData(this.tagService.getTags());
		this.createChart();
		this.subscription = this.tagService.tagChange.subscribe(
			(tags:Tag[]) => {
				this.updateData(tags);
				this.updateChart();
			}
		);
	}

	ngOnDestroy(): void
	{
		this.subscription.unsubscribe();
	}

	public createChart(): void
	{
		this.tagUsageChart = new Chart('tagUsageChart', {
			type: 'bar',
			data: {
				labels: [
					this.topTags[0].name, this.topTags[1].name, 
					this.topTags[2].name, this.topTags[3].name, 
					this.topTags[4].name, this.topTags[5].name, 
					this.topTags[6].name, this.topTags[7].name, 
					this.topTags[8].name, this.topTags[9].name],
				datasets: [{
					label: 'Books Linked with Tag',
					data: [
						this.topTags[0].amount, this.topTags[1].amount,
						this.topTags[2].amount, this.topTags[3].amount,
						this.topTags[4].amount, this.topTags[5].amount,
						this.topTags[6].amount, this.topTags[7].amount,
						this.topTags[8].amount, this.topTags[9].amount
					],
					backgroundColor: [
						'rgba(251, 204, 70, 0.35)'
					],
					borderColor: [
						'rgba(251, 204, 70, 1)'
					],
					borderWidth: 2
				}]
			},
			options: {
				scales: {
					y: {
						title: {
							display: true,
							text: 'Books Linked with Tag'
						}
					},
					x: {
						title: {
							display: true,
							text: 'Tag Name'
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					title: {
						display: true,
						text: 'Top 10 Most Used Tags'
					}
				}
			}
		});
	}

	public updateData(tags:Tag[]): void
	{
		// Reset data
		this.averageTagsPerBook = 0;
		this.topTags = tags;

		// Calculate metadata
		let totalTagAmount = 0;
		let totalBooks = this.bookService.getBooks().length;
		if(totalBooks == 0) { this.averageTagsPerBook = 0; }
		else
		{
			for(let tag of tags) { totalTagAmount += tag.amount; }
			this.averageTagsPerBook = Math.round((totalTagAmount / totalBooks) * 100) / 100;
		}

		// Check and adjust if there are less than 10 tags
		for(let i = 0; i < 10; i++)
		{
			if(this.topTags[i] == undefined) { this.topTags[i] = new Tag("Empty Tag", 0); }
		}

		// Sort tags by number of books descending
		this.topTags.sort((t1, t2) => t2.amount - t1.amount);
		this.topTags.splice(10);
	}

	public updateChart(): void
	{
		this.tagUsageChart.data.labels = [
			this.topTags[0].name, this.topTags[1].name,
			this.topTags[2].name, this.topTags[3].name,
			this.topTags[4].name, this.topTags[5].name,
			this.topTags[6].name, this.topTags[7].name,
			this.topTags[8].name, this.topTags[9].name
		];
		this.tagUsageChart.data.datasets[0].data = [
			this.topTags[0].amount, this.topTags[1].amount,
			this.topTags[2].amount, this.topTags[3].amount,
			this.topTags[4].amount, this.topTags[5].amount,
			this.topTags[6].amount, this.topTags[7].amount,
			this.topTags[8].amount, this.topTags[9].amount
		];
		this.tagUsageChart.update();
	}
}

import { DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl } from "@angular/platform-browser";
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "safe" })
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) { }

    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        console.log('safe - type',  type, 'value', value, this.sanitizer.bypassSecurityTrustResourceUrl(value));

        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'style': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'script': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            case 'url': return this.sanitizer.bypassSecurityTrustResourceUrl(value);;
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error(`Invalid safe type specified: ${type}`);
        }
    }
}    
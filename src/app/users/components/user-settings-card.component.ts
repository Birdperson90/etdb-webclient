import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { User, ProfileImageMetaInfo } from '@etdb/models';

@Component({
    selector: 'etdb-user-settings-card',
    templateUrl: 'user-settings-card.component.html',
    styleUrls: ['user-settings-card.component.scss']
})
export class UserSettingsCardComponent implements OnChanges {
    @Input()
    user: User;
    @Input()
    showProfileImageUploadButton: boolean;
    @Output()
    profileImageUpload: EventEmitter<File> = new EventEmitter<File>();
    @Output()
    profileImageRemove: EventEmitter<string> = new EventEmitter<string>();

    public imageLoading: boolean;

    public selectedImage: ProfileImageMetaInfo;
    public selectedImageIndex: number;

    public ngOnChanges(changes: SimpleChanges): void {
        if (
            !changes['user'] ||
            !this.user ||
            !this.user.profileImageMetaInfos.length
        ) {
            return;
        }

        this.selectedImage = this.user.profileImageMetaInfos.find(
            image => image.isPrimary
        );

        if (!this.selectedImage) {
            this.selectedImage = this.user.profileImageMetaInfos[0];
        }

        this.selectedImageIndex = this.user.profileImageMetaInfos.indexOf(
            this.selectedImage
        );
    }

    public selectNext(): void {
        if (
            this.selectedImageIndex ===
            this.user.profileImageMetaInfos.length - 1
        ) {
            this.selectedImageIndex = 0;
            this.selectedImage = this.user.profileImageMetaInfos[0];
            return;
        }

        this.selectedImageIndex += 1;
        this.selectedImage = this.user.profileImageMetaInfos[
            this.selectedImageIndex
        ];
    }

    public selectPrevious(): void {
        if (this.selectedImageIndex === 0) {
            this.selectedImageIndex =
                this.user.profileImageMetaInfos.length - 1;
            this.selectedImage = this.user.profileImageMetaInfos[
                this.selectedImageIndex
            ];
            return;
        }

        this.selectedImageIndex -= 1;
        this.selectedImage = this.user.profileImageMetaInfos[
            this.selectedImageIndex
        ];
    }

    public requestProfileImageUpload(files: File[]): void {
        this.profileImageUpload.emit(files[0]);
    }

    public requestProfileImageRemove(imageMeta: ProfileImageMetaInfo): void {
        this.profileImageRemove.emit(imageMeta.removeUrl);
    }
}

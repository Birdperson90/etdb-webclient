import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@etdb/shared';
import {
    UserProfileComponent,
    UsersRoutingComponent,
    UserSettingsComponent
} from '@etdb/users/containers';
import { UserEffects, UserSearchEffects } from '@etdb/users/+state/effects';
import { reducers } from '@etdb/users/+state/reducers';
import { UserService, UserSearchService } from '@etdb/users/services';
import { UsersRoutingModule } from '@etdb/users/users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CustomControlModule } from '@etdb/custom-controls/custom-controls.module';
import { ReactiveFormsModule } from '@angular/forms';
import {
    UserPasswordchangeFormComponent,
    UserInfochangeComponent,
    UserImageControlComponent,
    UserNameChangeComponent
} from '@etdb/users/components';
import { UsersFacadeService, UsersSearchFacadeService } from '@etdb/users/+state/facades';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([UserEffects, UserSearchEffects]),
        MaterialModule,
        UsersRoutingModule,
        CustomControlModule,
        ReactiveFormsModule
    ],
    declarations: [
        UsersRoutingComponent,
        UserProfileComponent,
        UserSettingsComponent,
        UserPasswordchangeFormComponent,
        UserInfochangeComponent,
        UserImageControlComponent,
        UserNameChangeComponent,
    ],
    providers: [UserService, UserSearchService, UsersFacadeService, UsersSearchFacadeService]
})
export class UsersModule { }

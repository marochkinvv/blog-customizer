import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useState, useRef, useEffect } from 'react';
import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	contentWidthArr,
	backgroundColors,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(articleState);

	// Состояние меню (открыто/закрыто)
	const [isMenuOpen, setIsMenuOpen] = useState(true);

	// Реф для меню
	const menuRef = useRef<HTMLDivElement>(null);

	// Обработчик инпутов формы
	const inputChangeHandler = (
		key: keyof ArticleStateType,
		value: OptionType
	) => {
		setSelectArticleState((prevState) => ({ ...prevState, [key]: value }));
	};

	// Показать/скрыть меню
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	// Принять изменения
	const applyChanges = () => {
		setArticleState(selectArticleState);
	};

	// Сброс изменений
	const clearChanges = () => {
		setArticleState(defaultArticleState);
		setSelectArticleState(defaultArticleState);
	};

	// Обработчик клика вне меню
	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setIsMenuOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<>
			<ArrowButton isOpen={isMenuOpen} onClick={toggleMenu} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={menuRef}>
				<form className={styles.form}>
					<Text
						as='h2'
						size={31}
						weight={800}
						align={'center'}
						uppercase
						dynamicLite>
						Задайте параметры
					</Text>
					<Select
						title={'шрифт'}
						selected={selectArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selectElement: OptionType) =>
							inputChangeHandler('fontFamilyOption', selectElement)
						}
					/>
					<RadioGroup
						title={'размер шрифта'}
						name={'font-size'}
						selected={selectArticleState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selectElement: OptionType) =>
							inputChangeHandler('fontSizeOption', selectElement)
						}
					/>
					<Select
						title={'цвет шрифта'}
						selected={selectArticleState.fontColor}
						options={fontColors}
						onChange={(selectElement: OptionType) =>
							inputChangeHandler('fontColor', selectElement)
						}
					/>
					<Separator />
					<Select
						title={'цвет фона'}
						selected={selectArticleState.backgroundColor}
						options={backgroundColors}
						onChange={(selectElement: OptionType) =>
							inputChangeHandler('backgroundColor', selectElement)
						}
					/>
					<Select
						title={'ширина контента'}
						selected={selectArticleState.contentWidth}
						options={contentWidthArr}
						onChange={(selectElement: OptionType) =>
							inputChangeHandler('contentWidth', selectElement)
						}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={clearChanges}
						/>
						<Button
							title='Применить'
							htmlType='button'
							type='apply'
							onClick={applyChanges}
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
